import { connectToDB } from "../db/index.js";
import { FailureResponse, SuccessResponse } from "../Utilities/index.js";
import {INSERT_SUBSCRIPTIONS, GET_SUBSCRIPTIONS} from '../Models/subscription-model-db.js'
import Stripe from "stripe";
import moment from "moment";

const pool = connectToDB();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const getUrl = () =>{
    if(process.env.NODE_ENV === 'production'){
        return process.env.PRODUCTION_URL
    }
    else
    {
        return process.env.DEVELOPMENT_URL
    }
}
 
export const createSubscription = (req, res) => {
  try {
    const { name, points, valid_till, price } = req.body;

    if(!Array.isArray(points)){
        return FailureResponse(res,'Points are should be in array', null, 400)
    }
    const pointStr = JSON.stringify(points)

    pool.query(INSERT_SUBSCRIPTIONS, [name, pointStr, valid_till, price], (err, results) => {
      if (err) {
        console.log(err);
        return FailureResponse(res, 'Internal Server Error', null, 500);
      }
      if (results.insertId) {
        return SuccessResponse(res, 'Subscription has been created', { id: results.insertId }, 200);
      } else {
        return FailureResponse(res, 'Failed to create the subscription', null, 400);
      }
    });
  } catch (error) {
    console.log(error);
    return FailureResponse(res, 'Internal Server Error', null, 500);
  }
};
export const getSubscription = (req,res) =>{
    try{
        pool.query(GET_SUBSCRIPTIONS, (err, results)=>{
            if(err){
                console.log(err);
                return FailureResponse(res, 'Internal Server Error');
            }
            return SuccessResponse(res, 'Fetched Successfully',results, 200)
        })
    }
    catch(error){
        console.log(error);
        return FailureResponse(res, 'Internal Server Error', null, 500)
        
    }
}
export const purchaseSubscription = async (req,res)=>{
    try{
        const {subscriptionId} = req.body;
        const userId = req.user?.userId
        if(!userId){
            return FailureResponse(res, 'User not authenticated', null, 401)
        }
        const subscriptionResult = await new Promise((resolve, reject)=>{
            pool.query('SELECT id, name, points, valid_till, price FROM subscriptions WHERE id = ?', [subscriptionId], (err, results)=>{
                if(err){return reject(err)}
                resolve(results)
            })
        })

        const subscription = subscriptionResult[0]
        if(!subscription){
            return FailureResponse(res, 'Subscription not found', null, 400)
        }
        console.log(subscription);
    
        const unitAmount = Math.round(subscription.price * 100)

        console.log(getUrl);
        

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {name: subscription.name},
                unit_amount: unitAmount
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url: `${getUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${getUrl()}/cancel`,
            client_reference_id: subscriptionId,
        })

        if(session){
            return SuccessResponse(res, 'Payment Successfull', {id: session.id}, 200)
        }
        else
        {
            return FailureResponse(res, 'Payment Failed', null, 400)
        }
    }
    catch(error){
        console.log(error);
        return FailureResponse(res, 'Internal Server Error', null, 500)
        
    }
}
export const confirmSubscription = async (req,res)=>{
    try{
        const {sessionId} = req.body;
        const userId = req.user?.userId

        if(!userId){
            return FailureResponse(res, 'User not authenticated', null, 400)
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (!session) {
            return FailureResponse(res, 'Session not found', null, 400)
        }

        if(session.payment_status !== 'paid'){
            return FailureResponse(res, 'Payment not found please check!', null, 400)
        }

        const payemnt_intent_id = session.payment_intent;

        const subscriptionId = session.client_reference_id;

        const getSubscription = () =>{
            return new Promise((resolve, reject)=>{
                pool.query('SELECT  valid_till FROM subscriptions WHERE id = ?', [subscriptionId], (err, results)=>{
                    if(err){return reject(err)}
                    resolve(results)
                })
            })
        }

        const subscription = await getSubscription();
        const expiryDate = moment().add(subscription[0].valid_till, 'days').format('YYYY:MM:DD')

        const saveUserSubscription = () => {
            return new Promise((resolve, reject) => {
                const insertUserSubscriptionQuery = `
                    INSERT INTO user_subscription (subscription_id, user_id, expiry_date, payment_id, created_at, updated_at)
                    VALUES (?, ?, ?, ?, NOW(), NOW())
                `;
                pool.query(
                    insertUserSubscriptionQuery,
                    [subscriptionId, userId , expiryDate, payemnt_intent_id],
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    }
                );
            });
        };
        await saveUserSubscription()
        return SuccessResponse(res, 'Payment Confirmation and subscription done', {message: 'Subscription confirmation successfull'}, 200)
    }
    catch(error){
        console.log(error);
        return FailureResponse(res, 'Internal Server Error', null, 500)
        
    }
}
export const checkUserSubscription = async (req, res) => {
    try {
      const userId = req.user?.userId;  
      if (!userId) {
        return FailureResponse(res, 'User not authenticated', null, 401);
      }

      const query = `
        SELECT * FROM user_subscription 
        WHERE user_id = ? 
        AND expiry_date >= NOW()
      `;
  
      const subscriptionResult = await new Promise((resolve, reject) => {
        pool.query(query, [userId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
  
      if (subscriptionResult.length > 0) {
        return SuccessResponse(res, 'Active subscription found', { isSubscribed: true }, 200);
      } else {
        return SuccessResponse(res, 'No active subscription', { isSubscribed: false }, 200);
      }
    } catch (error) {
      console.log(error);
      return FailureResponse(res, 'Internal Server Error', null, 500);
    }
  };
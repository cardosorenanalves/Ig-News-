import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
) {
    // Buscar o usuario no banco do FaunaDB com o ID {customerID}
    // Salvar os dados da subscription no FaunaDB
    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )
    console.log('saas',subscriptionId, customerId);
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    //console.log('subscriptionData', subscriptionData)

    if (createAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                {data: subscriptionData}
            )
        )

    } else {
        await fauna.query(
            //existe dos métodos para atualizar no banco de daods do fauna
            // updated atualiza uma das informações
            // o replace substitui ela por completo.
            q.Replace(
                q.Select(
                    'ref',
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                             subscriptionId,
                        )
                    )
                ),
                {data: subscriptionData}
            )
        )
    }

}   
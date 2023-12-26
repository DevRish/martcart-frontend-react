import { AWS_BUCKET_URL, RAZORPAY_KEY_ID } from "../config/keys";

export interface IGetRazorpayCheckoutConfigArgs {
    amount: number,
    order_id: string,
    name: string,
    email: string,
    phone: string,
    color?: string,
    handlePaymentSuccess: (...args: any[]) => void,
}

function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log('razorpay loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.log('error in loading razorpay');
        resolve(false);
      };
      document.body.appendChild(script);
    })
}

export async function renderCheckoutConfig({
    amount,
    order_id,
    name,
    email,
    phone,
    color,
    handlePaymentSuccess
}: IGetRazorpayCheckoutConfigArgs) {
    const config = {
        key: RAZORPAY_KEY_ID,
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Martcart",
        description: "Payment for your order",
        image: AWS_BUCKET_URL + "/shopping-cart-solid.svg",
        order_id,
        handler: handlePaymentSuccess,
        // handler: function (response) {
        //     // verify payment signature
        //     // on successful verification, call the addOrders functions of Checkout.tsx
        //     alert(response.razorpay_payment_id);
        //     alert(response.razorpay_order_id);
        //     alert(response.razorpay_signature)
        // },
        prefill: {
            name,
            email,
            contact: phone
        },
        notes: { // Idk what this info is used for. Seems useless or optional.
            address: "Razorpay Corporate Office"
        },
        theme: {
            color
        }
    }

    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );
  
    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }
    
    const rzp1 = new window.Razorpay(config);

    // rzp1.on('payment.failed', (response) => {
    //   // response.error.metadata.payment_id contains paymentId
    // });

    rzp1.open();
}
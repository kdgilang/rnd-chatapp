import FormSignin from '@/components/FormSignin'
import FormSignup from '@/components/FormSignup'
import ContentSendActivation from '@/components/content-sendactivation'
import ContentActivation from '@/components/content-activation'
const HomeRouter = [
    {
      path: 'signin',
      name: 'Signin',
      component: FormSignin
    },
    {
      path: 'signup',
      name: 'Signup',
      component: FormSignup
    },
    {
      path: 'sendactivation',
      name: 'Sendactivation',
      component: ContentSendActivation
    },
    {
      path: 'activation/:data',
      name: 'activation',
      component: ContentActivation
    }
];
export default HomeRouter;
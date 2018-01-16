import FormSignin from '@/components/FormSignin'
import FormSignup from '@/components/FormSignup'
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
    }
];
export default HomeRouter;
import { SignUp } from '@clerk/nextjs'

// wrapping in a server component
const SignUpPage = () => {
  return <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
}

export default SignUpPage

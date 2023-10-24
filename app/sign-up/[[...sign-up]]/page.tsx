import { SignUp } from '@clerk/nextjs'

// wrapping in a server component
const SignUpPage = () => {
  return (
    <div className="flex justify-center p-20">
      <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
    </div>
  )
}

export default SignUpPage

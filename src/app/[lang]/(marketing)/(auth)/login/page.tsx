import { cookies } from 'next/headers'
import LoginForm from '../components/login-form'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  if (cookies().has('token')) redirect('/')
  return (
    <div className="flex h-screen justify-center items-center">
      <LoginForm />
    </div>
  )
}

'use client'
import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-left"
      toastOptions={{
        duration: 8000,
      }}
      containerStyle={{ marginLeft: '10%' }}
    />
  )
}

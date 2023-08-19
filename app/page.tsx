import Image from 'next/image'

import MainLayout from './components/Main';

export default function Home() {
  return (
    <MainLayout>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Walking Dead Api</h1>
      </div>
    </MainLayout>

  )
}

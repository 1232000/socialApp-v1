import React from 'react'
import { Footer, FooterCopyright} from "flowbite-react";
export default function AppFooter() {
  return (
    <>
      <Footer container className='rounded-none bg-blue-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)]'>
        <FooterCopyright className='text-blue-900 dark:text-gray-400 mx-auto' by="Malak Esmail" year={2025} />
      </Footer>
    </>
  );
}

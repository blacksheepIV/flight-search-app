'use client'

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 fixed bottom-0 left-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-left">
            <h3 className="text-lg font-semibold text-dodger_blue-500 text-center md:text-left">
              SkySearch
            </h3>
            <p className="text-sm text-black-600">Find your perfect flight</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a
              href="#"
              className="text-sm text-black-600 hover:text-dodger_blue-400 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-black-600 hover:hover:text-dodger_blue-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-black-600 hover:hover:text-dodger_blue-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-black-600 hover:hover:text-dodger_blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SkySearch. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

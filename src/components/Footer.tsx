import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm font-light">
            Developed by {''}
            <Link href="https://www.linkedin.com/in/gabrielsvpinheiro/" className="font-medium hover:text-gray-400"  target="_blank">
                Gabriel Pinheiro
            </Link>
        </p>
      </div>
    </footer>
  );
}
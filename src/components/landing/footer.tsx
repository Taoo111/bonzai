import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/bonzai-logo.png" alt="Bonzai MMA" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight">BONZAI MMA</span>
            </Link>
            <p className="text-zinc-500 max-w-sm">
              Profesjonalny klub sztuk walki. Dyscyplina, siła i społeczność.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <Instagram className="h-5 w-5 text-zinc-400" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <Facebook className="h-5 w-5 text-zinc-400" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <Youtube className="h-5 w-5 text-zinc-400" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              Nawigacja
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'O nas', href: '#o-nas' },
                { label: 'Trenerzy', href: '#trenerzy' },
                { label: 'Harmonogram', href: '#harmonogram' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              Kontakt
            </h4>
            <ul className="space-y-3 text-zinc-500 text-sm">
              <li>ul. Przykładowa 123</li>
              <li>00-000 Warszawa</li>
              <li className="pt-2">
                <Link
                  href="tel:+48123456789"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  +48 123 456 789
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:kontakt@bonzaimma.pl"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  kontakt@bonzaimma.pl
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Bonzai MMA. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">
              Polityka prywatności
            </Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Bonzai MMA Club - Profesjonalne treningi sztuk walki',
  description: 'Dołącz do najlepszego klubu MMA w mieście',
}

export default async function LandingPage() {
  const payload = await getPayload({ config })

  // Pobierz wszystkie rodzaje zajęć
  const { docs: trainingClasses } = await payload.find({
    collection: 'training-classes',
    limit: 100,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Witaj w Bonzai MMA Club</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Profesjonalne treningi sztuk walki dla każdego. Dołącz do naszej społeczności i rozwijaj
          swoje umiejętności.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Dołącz teraz</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Zaloguj się
            </Button>
          </Link>
        </div>
      </section>

      {/* O nas Section */}
      <section id="o-nas" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">O nas</h2>
        <div className="max-w-3xl mx-auto text-center text-muted-foreground">
          <p className="text-lg mb-4">
            Bonzai MMA Club to miejsce, gdzie pasja spotyka się z profesjonalizmem. Oferujemy
            treningi dla osób na każdym poziomie zaawansowania.
          </p>
          <p className="text-lg">
            Nasz zespół doświadczonych trenerów pomoże Ci osiągnąć Twoje cele, niezależnie od tego,
            czy chcesz poprawić kondycję, nauczyć się samoobrony, czy rywalizować na najwyższym
            poziomie.
          </p>
        </div>
      </section>

      {/* Zajęcia Section */}
      <section id="zajecia" className="container mx-auto px-4 py-16 bg-muted/50">
        <h2 className="text-3xl font-bold text-center mb-12">Nasze zajęcia</h2>

        {trainingClasses.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Brak dostępnych zajęć. Sprawdź ponownie później.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingClasses.map((trainingClass) => (
              <Card
                key={trainingClass.id}
                className="hover:shadow-lg transition-shadow"
                style={
                  trainingClass.color
                    ? { borderTopColor: trainingClass.color, borderTopWidth: '4px' }
                    : undefined
                }
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {trainingClass.color && (
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: trainingClass.color }}
                      />
                    )}
                    {trainingClass.name}
                  </CardTitle>
                  <CardDescription>Profesjonalne treningi {trainingClass.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/register">
                    <Button variant="outline" className="w-full">
                      Zapisz się
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Gotowy na start?</CardTitle>
            <CardDescription>Dołącz do naszej społeczności już dziś</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/register">
              <Button size="lg" className="w-full md:w-auto">
                Zarejestruj się teraz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

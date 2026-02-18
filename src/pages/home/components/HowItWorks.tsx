

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white border-t border-[#E5E7EB] py-12"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comment ça marche
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Recherchez</h3>
            <p className="text-[#6B7280]">
              Entrez votre position ou utilisez votre localisation actuelle pour
              trouver les pharmacies autour.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Comparez</h3>
            <p className="text-[#6B7280]">
              Consultez les horaires, distances, spécialités et évaluations des
              pharmacies.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Contactez</h3>
            <p className="text-[#6B7280]">
              Appelez directement ou chattez avec la pharmacie choisie pour
              poser vos questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

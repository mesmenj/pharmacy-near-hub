interface Props {
  features?: any;
}

function FeaturesSection({ features }: Props) {
  return (
    <section id="features" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        Pourquoi choisir Pharmacy Near Hub ?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature: any, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-[#6B7280]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;

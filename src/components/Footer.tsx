import { MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xl font-bold">Pharmacy Near Hub</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[#6B7280]">
              © 2024 Pharmacy Near Hub. Tous droits réservés.
            </p>
            <p className="text-sm text-[#6B7280]">
              Service gratuit pour tous les utilisateurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

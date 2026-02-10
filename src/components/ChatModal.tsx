import { MessageCircle, X } from "lucide-react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ChatModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">
              {
                // selectedPharmacy
                //   ? `Chat avec ${selectedPharmacy.name}`
                //   :
                "Chat avec toutes les pharmacies"
              }
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 h-96 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg max-w-xs">
              <p className="text-sm text-[#1F2937]">
                Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
              </p>
              <span className="text-xs text-[#6B7280] mt-1 block">10:30</span>
            </div>

            <div className="bg-[#F9FAFB] p-4 rounded-lg max-w-xs ml-auto">
              <p className="text-sm text-[#1F2937]">
                Je cherche une pharmacie qui vend des produits homéopathiques
              </p>
              <span className="text-xs text-[#6B7280] mt-1 block text-right">
                10:32
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Tapez votre message..."
              className="flex-1 p-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;

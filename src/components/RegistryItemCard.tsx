import React from 'react';
import { RegistryItem } from './RegistryCard';

interface RegistryItemCardProps {
  item: RegistryItem;
  isOwnRegistry: boolean;
  onClaim: () => void;
  onRemove: () => void;
}

export const RegistryItemCard: React.FC<RegistryItemCardProps> = ({ 
  item, 
  isOwnRegistry, 
  onClaim, 
  onRemove 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-square w-full bg-gray-200">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-700">${item.price.toFixed(2)}</p>
        
        {item.claimed ? (
          <div className="mt-4 bg-gray-100 p-2 rounded text-center">
            <p>Claimed by {item.claimedBy}</p>
          </div>
        ) : (
          <>
            {/* Only show claim button if viewing someone else's registry */}
            {!isOwnRegistry ? (
              <button 
                onClick={onClaim} 
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Claim This Gift
              </button>
            ) : (
              <div className="mt-4 bg-gray-100 p-2 rounded text-center">
                <p>Not yet claimed</p>
              </div>
            )}
          </>
        )}
        
        {/* Show remove button only for own registry */}
        {isOwnRegistry && (
          <button 
            onClick={onRemove}
            className="mt-2 w-full py-1 px-4 border border-red-500 text-red-500 rounded hover:bg-red-50"
          >
            Remove Item
          </button>
        )}
      </div>
    </div>
  );
};
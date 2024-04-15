import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Pet } from "../app/adopt_a_paw/page";

interface FavoritesProps {
  showFavorites: boolean;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  favoritesItems: any[];
  selectedPet: Pet | null;
  setIsFavoritesEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  removeItem: (pet: any) => void;
  toggleCardDetailPopup: (pet: any) => void;
}

export default function Favorites({
  showFavorites,
  setShowFavorites,
  favoritesItems,
  selectedPet,
  setIsFavoritesEmpty,
  removeItem,
  toggleCardDetailPopup,
}: FavoritesProps) {
  const favoritesList = favoritesItems.map((selectedPet) => (
    <div
      key={selectedPet.id}
      className="flex items-center justify-between border-b border-gray-200 py-4"
    >
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden w-12 h-12 mr-4">
          <img
            className="w-full h-full object-cover"
            src={selectedPet.image}
            alt={selectedPet.name}
            data-testid="favorites-side-item-img"
          />
        </div>
        <div className="flex flex-col item-left">
          <p className="text-left" data-testid="favorites-side-item-name">
            Name: {selectedPet.name}
          </p>
          <p className="text-left" data-testid="favorites-side-item-age">
            Age: {selectedPet.age}
          </p>
          <p
            className="text-left"
            data-testid="favorites-side-item-availability"
          >
            Availability: {selectedPet.availability}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            setShowFavorites(false);
            toggleCardDetailPopup(selectedPet);
          }}
          className="text-blue-500 hover:text-blue-700"
          data-testid="favorites-side-item-review-btn"
        >
          Review
        </button>
        <button
          onClick={() => removeItem(selectedPet)}
          className="text-red-500 hover:text-red-700"
          data-testid="favorites-side-item-remove-btn"
        >
          Remove
        </button>
      </div>
    </div>
  ));

  return (
    <Transition.Root show={showFavorites} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={setShowFavorites}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="w-screen max-w-md">
                <div className="flex flex-col h-full bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                    <Dialog.Title
                      className="text-lg font-medium text-gray-900"
                      data-testid="favorites-side-header"
                    >
                      Favorites
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowFavorites(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                    {favoritesItems.length > 0 ? (
                      <>{favoritesList}</>
                    ) : (
                      <div className="flex flex-col item-left">
                        <p className="text-left">The list is empty</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <p className="mt-0.5 text-sm text-gray-500">
                      Please note check availability before completing the
                      adoption application form.
                    </p>
                    <div className="mt-6">
                      <button
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        data-testid="side-item-btn"
                        onClick={() => setShowFavorites(false)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

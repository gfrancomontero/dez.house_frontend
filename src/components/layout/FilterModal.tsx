// src/components/layout/FilterModal.tsx
import React, { useState, useEffect } from 'react';
import { Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import SearchIcon from '/public/icons/svg/search.svg';
import { useSearch } from '../../context/SearchContext';

const FilterModal: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { searchParams, setSearchParams } = useSearch();
  const [isHarlemChecked, setIsHarlemChecked] = useState(false);

  useEffect(() => {
    if (isHarlemChecked) {
      setSearchParams((prevParams) => ({ ...prevParams, location: 'harlem' }));
    } else {
      setSearchParams((prevParams) => {
        const { location, ...rest } = prevParams;
        return rest;
      });
    }
  }, [isHarlemChecked, setSearchParams]);

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-[#6969ff] border-small border-white/50 shadow-pink-500/30 p-4 pr-2"
      >
        <div className="flex flex-row align mt-1">
          ADVANCED SEARCH <SearchIcon className="ml-2" />
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Advanced Search</ModalHeader>
              <ModalBody>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isHarlemChecked}
                    onChange={(e) => setIsHarlemChecked(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">Harlem</span>
                </label>
                {/* Add more search filters as needed */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterModal;

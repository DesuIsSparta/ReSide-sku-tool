import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

type Sku = {
  skunum: number;
  skuType: string;
  rolesMask: string;
  gender: string;
  brand: string;
  drwrName: string;
  meshName: string;
  txtrNames: string;
  descShrt: string;
  descLong: string;
  stores: string;
  bornWith: string;
  price: string;
  avail: string;
  qtyMfr: string;
  rspk: string;
  expireTime: string;
  tags: string;
  author: string;
};

export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [skus, setSkus] = useState<Sku[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('mesh');

  const [selectedSku, setSelectedSku] = useState<Sku | undefined>(undefined);

  const parseSkus = async () => {
    const csvFilePath = process.env.PUBLIC_URL + '/skus.csv';

    try {
      const response = await fetch(csvFilePath);
      const csvData = await response.text();
      Papa.parse(csvData, {
        delimiter: "\|",
        header: false,
        skipEmptyLines: 'greedy',
        fastMode: true,
        complete: (results) => {
          const parsedSkus: Sku[] = results.data.map((raw: any) => {
            console.log(raw[18]);
            return {
              skunum: parseInt(raw[0]),
              skuType: raw[1],
              rolesMask: raw[2],
              gender: raw[3],
              brand: raw[4],
              drwrName: raw[5],
              meshName: raw[6],
              txtrNames: raw[7],
              descShrt: raw[8],
              descLong: raw[9],
              stores: raw[10],
              bornWith: raw[11],
              price: raw[12],
              avail: raw[13],
              qtyMfr: raw[14],
              rspk: raw[15],
              expireTime: raw[16],
              tags: raw[17],
              author: raw[18],
            };
          });

          setSkus(parsedSkus);
        },
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
    }
  };

  useEffect(() => {
    parseSkus().then(() => setIsLoading(false)); // Set loading to false once data is fetched and processed
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const skuTypes = Array.from(new Set(skus.map((sku) => sku.skuType)));

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value);
  };

  const filterSkus = () => {
    return skus.filter((sku) => {
      const values = Object.values(sku).join('').toLowerCase();
      return values.includes(searchQuery.toLowerCase()) && (filterValue === '' || sku.skuType === filterValue);
    });
  };

  if (isLoading) {
    return (
      <div>
        <h1 className='text-9xl'></h1>
      </div>
    );
  }

  const skuTemplate = (sku: Sku) => {
    return (
      <div className='w-[125px] h-[130px] bg-gray-200 rounded-lg flex flex-col' title={sku.descShrt}>
        <div className='w-full h-[100px] flex items-center justify-center bg-gray-800 rounded-tl-lg rounded-tr-lg cursor-pointer' onClick={() => { setSelectedSku(sku); }}>
          <img src={`${process.env.PUBLIC_URL}/img/skus/${sku.skunum}.png`} alt={sku.skunum.toString()} className='object-cover text-center' loading='lazy' width={100} height={100} />
        </div>
        <div className='text-center flex-grow flex justify-center items-center'>
          <p className='text-xs text-gray-500'>{sku.skunum}</p>
        </div>
      </div>
    );
  };


  const skuModal = () => {
    if (!selectedSku) return null;
    return (
      <div className="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex flex-row w-full">
                    {/* <img src={`${process.env.PUBLIC_URL}/img/skus/${selectedSku!.skunum}.png`} alt={selectedSku!.skunum.toString()} className='object-contain text-center ' loading='lazy' width={100} height={100} /> */}

                    <ul className="pl-4">
                      <li>
                        <span className="font-bold">skunum: </span>
                        <span className="font-normal">{selectedSku.skunum}</span>
                      </li>
                      <li>
                        <span className="font-bold">skuType: </span>
                        <span className="font-normal">{selectedSku.skuType}</span>
                      </li>
                      <li>
                        <span className="font-bold">rolesMask: </span>
                        <span className="font-normal">{selectedSku.rolesMask}</span>
                      </li>
                      <li>
                        <span className="font-bold">gender: </span>
                        <span className="font-normal">{selectedSku.gender}</span>
                      </li>
                      <li>
                        <span className="font-bold">brand: </span>
                        <span className="font-normal">{selectedSku.brand}</span>
                      </li>
                      <li>
                        <span className="font-bold">drwrName: </span>
                        <span className="font-normal">{selectedSku.drwrName}</span>
                      </li>
                      <li>
                        <span className="font-bold">meshName: </span>
                        <span className="font-normal">{selectedSku.meshName}</span>
                      </li>
                      <li>
                        <span className="font-bold">txtrNames: </span>
                        <span className="font-normal">{selectedSku.txtrNames}</span>
                      </li>
                      <li>
                        <span className="font-bold">descShrt: </span>
                        <span className="font-normal">{selectedSku.descShrt}</span>
                      </li>
                      <li>
                        <span className="font-bold">descLong: </span>
                        <span className="font-normal">{selectedSku.descLong}</span>
                      </li>
                      <li>
                        <span className="font-bold">stores: </span>
                        <span className="font-normal">{selectedSku.stores}</span>
                      </li>
                      <li>
                        <span className="font-bold">bornWith: </span>
                        <span className="font-normal">{selectedSku.bornWith}</span>
                      </li>
                      <li>
                        <span className="font-bold">price: </span>
                        <span className="font-normal">{selectedSku.price}</span>
                      </li>
                      <li>
                        <span className="font-bold">avail: </span>
                        <span className="font-normal">{selectedSku.avail}</span>
                      </li>
                      <li>
                        <span className="font-bold">qtyMfr: </span>
                        <span className="font-normal">{selectedSku.qtyMfr}</span>
                      </li>
                      <li>
                        <span className="font-bold">rspk: </span>
                        <span className="font-normal">{selectedSku.rspk}</span>
                      </li>
                      <li>
                        <span className="font-bold">expireTime: </span>
                        <span className="font-normal">{selectedSku.expireTime}</span>
                      </li>
                      <li>
                        <span className="font-bold">tags: </span>
                        <span className="font-normal">{selectedSku.tags}</span>
                      </li>
                      <li>
                        <span className="font-bold">author: </span>
                        <span className="font-normal">{selectedSku.author}</span>
                      </li>
                    </ul>


                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => { setSelectedSku(undefined); }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  const finalSkus = filterSkus();
  return (
    <div className='App h-[100vh] overflow-hidden flex flex-col'>

      {selectedSku && skuModal()}

      <header className='py-2 shadow-md'>
        <div className='flex flex-row gap-x-10 align-center justify-center'>
          <div>
            <p className='font-bold mb-2'>Sku Type</p>
            <select className="mb-4 p-2 border capitalize" value={filterValue} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {skuTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className='font-bold mb-2'>Search</p>
            <input
              type="text"
              placeholder="Search..."
              className="mb-4 p-2 border"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
          </div>

        </div>
      </header>

      <main className='flex-grow overflow-auto p-4'>
        <VirtuosoGrid
          data={finalSkus}
          totalCount={finalSkus.length}
          itemContent={index => skuTemplate(finalSkus[index])}
          cols={10}
          itemClassName=''
          listClassName='flex flex-row flex-wrap gap-2'
        />
      </main>
    </div>
  );
};

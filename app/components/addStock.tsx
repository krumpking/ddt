import React, { useState } from 'react';
import { FC } from 'react';
import { createId } from '../utils/stringM';
import { getCookie } from 'react-use-cookie';
import { ADMIN_ID, COOKIE_ID } from '../constants/constants';
import { decrypt, encrypt } from '../utils/crypto';
import { addAClientToDB } from '../api/crmApi';
import Loader from './loader';
import { ToastContainer, toast } from 'react-toastify';

const AddStock = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [stage, setStage] = useState('');
  const [notes, setNotes] = useState('');
  const [refSource, setRefSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState('');
  const [Price, setPrice] = useState('');
  const [salesPerson, setSalesPerson] = useState('');

  const addClient = () => {
    setLoading(true);
    var infoFromCookie = '';
    if (getCookie(ADMIN_ID) == '') {
      infoFromCookie = getCookie(COOKIE_ID);
    } else {
      infoFromCookie = getCookie(ADMIN_ID);
    }

    var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);

    var notesA = [];
    notesA.push(encrypt(notes, id));
    var prodA: any = [];
    if (products.includes(',')) {
      var prodAr = products.split(',');
      prodAr.forEach((el) => {
        prodA.push(encrypt(el, id));
      });
    } else {
      prodA.push(products);
    }
    var stock = {
      id: id,
      adminId: decrypt(infoFromCookie, COOKIE_ID),
      date: new Date().toDateString(),
      category: encrypt(category, id),
      name: encrypt(name, id),
      organisation: encrypt(number, id),
      stage: encrypt(stage, id),
      notes: notesA,
      refSource: encrypt(refSource, id),
      enquired: prodA,
      price: encrypt(price, id),
      encryption: 2,
      salesPerson: encrypt(salesPerson, id),
    };

    addStockToDB(stock)
      .then((r) => {
        toast.success('Stock added!');

        setLoading(false);
      })
      .catch((e) => {
        toast.error('There was an error adding stock please try again');
        setLoading(false);
        console.error(e);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center content-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <input
              type="text"
              value={category}
              placeholder={'Item Category'}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="
                        w-full
                        rounded-[25px]
                        border-2
                        border-[#fdc92f]
                        py-3
                        px-5
                        bg-white
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={name}
              placeholder={'Item Name'}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="
                        w-full
                        rounded-[25px]
                        border-2
                        border-[#fdc92f]
                        py-3
                        px-5
                        bg-white
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={number}
              placeholder={'Number of Items'}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              className="
                                    w-full
                                    rounded-[25px]
                                    border-2
                                    border-[#fdc92f]
                                    py-3
                                    px-5
                                    bg-white
                                    text-base text-body-color
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
            />
          </div>
          
         
          <div className="mb-6">
            <input
              value={Price}
              placeholder={'Total Price in USD'}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="
                                    w-full
                                    rounded-[25px]
                                    border-2
                                    border-[#fdc92f]
                                    py-3
                                    px-5
                                    bg-white
                                    text-base text-body-color
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
            />
          </div>
          

         
          <div className="mb-6">
            <button
              onClick={() => {
                AddStock();
              }}
              className="

                    font-bold
                    w-full
                    rounded-[25px]
                    border-2
                    border-[#fdc92f]
                    border-primary
                    py-3
                    px-5
                    bg-[#fdc92f]
                    text-base
                    text-[#7d5c00]
                    cursor-pointer
                    hover:bg-opacity-90
                    transition
                                    "
            >
              Add Stock
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AddStock;

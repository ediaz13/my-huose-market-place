import React from "react";
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, useRef: user.uid });
      } else {
        navigate("/sign-in");
      }
    });

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);

    // Add listing to Firestore
    // Redirect to profile
  }

  const onMutate = (e) => {}

  if (loading) {
    return <Spinner />;
  }

  return <div className="profile">
    <header>
      <p className="pageHeader">Create Listing</p>
    </header>

    <main>
      <form onSubmit={onSubmit}>
        <label className="formLabel">Sell / Rent</label>
        <div className="formButtons">
          <button
            type="button"
            className={type === 'sale' ? 'formButtonActive' : 'formButton'}
            id="type"
            value="sale"
            onClick={onMutate}
          >
            Sell
          </button>
          <button
            type="button"
            className={type === 'rent' ? 'formButtonActive' : 'formButton'}
            id="type"
            value="rent"
            onClick={onMutate}
          >
            Rent
          </button>
        </div>

        <label className="formLabel">Name</label>
        <input
          className="formInputName"
          type="text"
          id="name"
          value={name}
          onChange={onMutate}
          maxLength='32'
          minLength='10'
          required
        />
      </form>

      <div className="formRooms flex">
        <div>
          <label className="formLabel">Bedrooms</label>
          <input
            className="formInputSmall"
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={onMutate}
            min='1'
            max='50'
            required
          />
        </div>
        <div>
          <label className="formLabel">Bathrooms</label>
          <input 
            className="formInputSmall" 
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={onMutate}
            min='1'
            max='50'
            required
            />
        </div>
      </div>
      
      <label className="formLabel">Parking spot</label>
      <div className="formButtons">
        <button 
          className={parking ? 'formButtonActive' : 'formButton'}
          type="button"
          id="parking"
          value={true}
          onClick={onMutate}
          min='1'
          max='50'
          >
          Yes
        </button>
        <button 
          className={
            !parking && parking !== null ? 'formButtonActive' 
            : 'formButton'
          }
          type='button'
          id="parking"
          value={false}
          onClick={onMutate}
        >
          No
        </button>
      </div>

      <label className="formLabel">Furnished</label>
      <div className="formButtons">
        <button 
          className={furnished ? 'formButtonActive' : 'formButton'}
          type="button"
          id="furnished"
          value={true}
          onClick={onMutate}
          >
          Yes
        </button>
        <button 
          className={
            !furnished && furnished !== null ? 'formButtonActive' 
            : 'formButton'
          }
          type='button'
          id="furnished"
          value={false}
          onClick={onMutate}
        >
          No
        </button>
      </div>

      <label className="formLabel">Address</label>
      <textarea
        className="formInputAddress"
        type="text"
        id="address"
        value={address}
        onChange={onMutate}
        required
      />
      {!geolocationEnabled && (
        <div className="formLatLng flex">
          <div>
            <label className="formLabel">Latitude</label>
            <input 
              className="formInputSmall"
              type='number'
              id='latitude'
              value={latitude}
              onChange={onMutate}
              required
            />
          </div>
        </div>
        )}

      <label className="formLabel">Offer</label>
      <div className="formButtons">
        <button 
          className={offer ? 'formButtonActive' : 'formButton'}
          type="button"
          id="offer"
          value={true}
          onClick={onMutate}
          >
          Yes
        </button>
        <button 
          className={
            !offer && offer !== null ? 'formButtonActive' 
            : 'formButton'
          }
          type='button'
          id="offer"
          value={false}
          onClick={onMutate}
        >
          No
        </button>
      </div>

      <label className="formLabel">Regular Price</label>
      <div className="formPriceDiv">
        <input 
          className="formInputSmall"
          type="number"
          id="regularPrice"
          value={regularPrice}
          onChange={onMutate}
          min='50'
          max='750000000'
          required
        />
        {type === 'rent' && (
          <p className="formPriceText">$ /month</p>
        )}
      </div>
    </main>

    </div>;
}

export default CreateListing;

import { useState, useEffect } from "react";
import axios from "axios";

export default function product() {
  const [p_name, setP_name] = useState("");
  const [p_price, setP_price] = useState(0);
  const [p_qty, setP_qty] = useState(0);
  const [p_image, setP_image] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    if (products.length === 0) {
      getProduct();
    }
  }, []);

  const handleImage = (e) => {
    const render = new FileReader();

    console.log(e.target.files[0].size);
    if (e.target.files[0].size > 500000) {
      alert("Image File to large");
    }
    render.onload = (e) => {
      setP_image(e.target.result);
      console.log(e.target.result);
    };

    render.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4001/addproduct", {
        p_name: p_name,
        p_price: p_price,
        p_qty: p_qty,
        p_image: p_image,
      })
      .then((res) => {
        console.log(res.data.message);
        setProducts([
          ...products,
          {
            p_name: p_name,
            p_price: p_price,
            p_qty: p_qty,
            p_image: p_image,
          },
        ]);
      });
  };

  const getProduct = async () => {
    await axios.get("http://localhost:4001/getproduct").then((res) => {
      setProducts(res.data);
    });
  };

  const addProduct = () => {
    return (
      <div className="container main">
        <form>
          <div className="mb-3">
            <label className="form-label">Product Name:</label>
            <input
              className="form-control"
              type="text"
              name="p_name"
              onChange={(e) => {
                setP_name(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Price:</label>
            <input
              className="form-control"
              type="number"
              onChange={(e) => {
                setP_price(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Qty:</label>
            <input
              className="form-control"
              type="number"
              onChange={(e) => {
                setP_qty(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <div>
              <img className="img" src={p_image} />
            </div>

            <label className="form-label">Product Image:</label>

            <input
              className="form-control"
              type="file"
              name="file"
              onChange={handleImage}
            ></input>
          </div>

          <button
            className="btn btn-outline-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Poduct Page</h1>

      {open && addProduct()}
      {open ? (
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="btn btn-outline-info"
        >
          Hide addProduct
        </button>
      ) : (
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="btn btn-outline-info"
        >
          Show addProduct
        </button>
      )}
      <div>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => {
            getProduct();
          }}
        >
          Show Product
        </button>

        <div className="box-product mt-3">
          {products &&
            products.map((i, k) => {
              return (
                <>
                  <div className="card" key={i._id} style={{ width: "18rem" }}>
                    <img
                      src={i.p_image}
                      className="card-img-top"
                      key={k}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{i.p_name}</h5>
                      <p>Price: {i.p_price}</p>
                      <p> QTY: {i.p_qty}</p>

                      <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

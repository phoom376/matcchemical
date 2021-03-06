import { useState, useEffect } from "react";
import axios from "axios";
const Swal = require("sweetalert2");

export default function Product() {
  const [p_name, setP_name] = useState("");
  const [p_price, setP_price] = useState(0);
  const [p_qty, setP_qty] = useState(0);
  const [p_image, setP_image] = useState("");
  const [open, setOpen] = useState(false);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    if (Products.length === 0) {
      getProduct();
    }
  }, []);

  const handleImage = (e) => {
    const render = new FileReader();

    console.log(e.target.files[0].size);
    if (e.target.files[0].size > 500000) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Imgae To Large!",
      });
      setP_name("");

      document.getElementById("p_image").value = "";
    } else {
      render.onload = (e) => {
        setP_image(e.target.result);
        console.log(e.target.result);
      };

      render.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((p_name, p_image) !== "" && (p_price, p_qty) !== 0) {
      await axios
        .post("https://userlogapi.herokuapp.com/addproduct", {
          p_name: p_name,
          p_price: p_price,
          p_qty: p_qty,
          p_image: p_image,
        })
        .then(() => {
          Swal.fire("Product Added");

          getProduct();
          setP_image("");
          setP_name("");
          setP_price(0);
          setP_qty(0);
          document.getElementById("p_name").value = "";
          document.getElementById("p_price").value = "";
          document.getElementById("p_qty").value = "";
          document.getElementById("p_image").value = "";
          setOpen(!open);
        });
    } else {
      Swal.fire("Input?", "All In Put Is Required", "question");
    }
  };

  const getProduct = async () => {
    await axios
      .get("https://userlogapi.herokuapp.com/getproduct")
      .then((res) => {
        setProducts(res.data);
      });
  };

  const restForm = () => {
    setP_image("");
    setP_name("");
    setP_price(0);
    setP_qty(0);
  };

  const AddProduct = () => {
    return (
      <div className="container add_product">
        <div className="title">
          <p>Product Form</p>
        </div>
        <form className="form">
          <div className="mb-3">
            <label className="form-label">Product Name:</label>
            <input
              className="form-control"
              type="text"
              name="p_name"
              id="p_name"
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
              id="p_price"
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
              id="p_qty"
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
              id="p_image"
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
          <button
            className="btn btn-outline-warning m-lg-2"
            type="reset"
            onClick={restForm}
          >
            Clear
          </button>
        </form>
      </div>
    );
  };

  const DeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://userlogapi.herokuapp.com/delete/${id}`)
          .then(() => {
            setProducts(
              Products.filter((val) => {
                return val._id !== id;
              })
            );
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div>
      <h1>Poduct Page</h1>

      {open && AddProduct()}
      <div className="button">
        {open ? (
          <a
            onClick={() => {
              setOpen(!open);
            }}
            className="btn btn-outline-info"
          >
            Hide addProduct
          </a>
        ) : (
          <a
            onClick={() => {
              setOpen(!open);
            }}
            className="btn btn-outline-info"
          >
            Show addProduct
          </a>
        )}
        <div>
          <a
            className="btn btn-outline-primary mt-3"
            onClick={() => {
              getProduct();
            }}
          >
            Show Product
          </a>
        </div>
      </div>

      <div className="box-product mt-3">
        {Products &&
          Products.map((i, k) => {
            return (
              <div className="card" key={i._id}>
                <img src={i.p_image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{i.p_name}</h5>
                  <p>Price: {i.p_price}</p>
                  <p> QTY: {i.p_qty}</p>

                  <a
                    className="btn btn-outline-danger"
                    onClick={() => DeleteProduct(i._id)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

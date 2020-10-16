import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { TextField, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";

export default function App() {
  const [hasError, setErrors] = useState(false);
  const [datar, setDatar] = useState({});

  async function fetchData() {
    const res = await fetch(`http://dummy.restapiexample.com/api/v1/employees`);

    if (res.status === 200 && "json" in res) {
      res
        .json()
        .then((res) => setDatar(res))
        .catch(() => setErrors({ hasErrors: true }));
    }
  }

  const handleDatar = (event) => {
    setDatar(event.target.value);
  };
  const datas = datar.data;
  const distributionCenterLocal = [
    {
      name: "DC Tangerang",
    },
    {
      name: "DC Cikarang",
    },
  ];
  const paymentTypeLocal = [
    {
      name: "Cash H+1",
    },
    {
      name: "Cash H+3",
    },
    {
      name: "Cash H+7",
    },
    {
      name: "Transfer H+1",
    },
    {
      name: "Transfer H+3",
    },
    {
      name: "Transfer H+7",
    },
  ];
  const productsLocal = [
    {
      product_name: "Morning Dew Milk",
      units: [
        {
          name: "Pak",
          price: 10000,
        },
        { name: "Pcs", price: 1000 },
      ],
    },
    {
      product_name: "Le Minerale 600ml",
      units: [
        {
          name: "Pak",
          price: 10000,
        },
        { name: "Karton", price: 100000 },
      ],
    },
    {
      product_name: "Greenfields Full Cream Milk 1L",
      units: [
        {
          name: "Pak",
          price: 10000,
        },
        { name: "Pcs", price: 1000 },
        { name: "Karton", price: 700000 },
      ],
    },
  ];

  const {
    handleSubmit,
    handleChange,
    getFieldProps,
    errors,
    touched,
    isValid,
    dirty,
    values,
  } = useFormik({
    initialValues: {
      name: "",
      distributionCenter: "",
      paymentType: "",
      expiredDate: "",
      notes: "",
      orderProduct: [{}],
      product: "",
      unit: "",
      quantity: 0,
      price: 0,
      totalPrice: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string("name").required("Required"),
      distributionCenter: Yup.string().required("Required"),
      paymentType: Yup.string().required("Required"),
      expiredDate: Yup.string().required("Required"),
      product: Yup.string().required("Required"),
      unit: Yup.string().required("Required"),
      quantity: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      totalPrice: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (touched.product) {
    productsLocal.map(function (data) {
      if (data.product_name === values.product) {
        data.units.map(function (item) {
          if (item.name === values.unit) {
            return (values.price = item.price);
          }
        });
      }
    });
  }
  values.totalPrice = values.price * values.quantity;
  const newItem = (event) => {
    console.log("tes");
  };
  return (
    <>
      <div className="container-fluid">
        <Typography variant="h5" style={{ paddingLeft: "15px" }}>
          <strong>Create Order</strong>
        </Typography>
        <div className="card shadow-sm" style={{ marginBottom: "10px" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-3">
                  <strong>Detail</strong>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-9">
                      <label style={{ marginBottom: "0px" }}>
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        placeholder="name"
                        select
                        label="Name"
                        margin="dense"
                        variant="outlined"
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        {...getFieldProps("name")}
                      >
                        {datas && datas.length > 0 ? (
                          datas.map((data) => (
                            <option
                              className="p-1"
                              key={data.id}
                              value={data.employee_name}
                            >
                              {data.employee_name}
                            </option>
                          ))
                        ) : (
                          <label className="p-2">
                            {hasError ? hasError : <CircularProgress />}
                          </label>
                        )}
                      </TextField>
                    </div>
                    <div className="col-6">
                      <label style={{ marginBottom: "0px" }}>
                        Distribution Center
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        select
                        label="Distribution Center"
                        margin="dense"
                        variant="outlined"
                        helperText={
                          touched.distributionCenter
                            ? errors.distributionCenter
                            : ""
                        }
                        error={
                          touched.distributionCenter &&
                          Boolean(errors.distributionCenter)
                        }
                        {...getFieldProps("distributionCenter")}
                      >
                        {touched.name ? (
                          distributionCenterLocal &&
                          distributionCenterLocal.map((data) => (
                            <option className="p-1" value={data.name}>
                              {data.name}
                            </option>
                          ))
                        ) : (
                          <label className="p-1">No data available</label>
                        )}
                      </TextField>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-6">
                      <label style={{ marginBottom: "0px" }}>
                        Payment Type<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        select
                        label="Payment Type"
                        margin="dense"
                        variant="outlined"
                        helperText={
                          touched.paymentType ? errors.paymentType : ""
                        }
                        error={
                          touched.paymentType && Boolean(errors.paymentType)
                        }
                        {...getFieldProps("paymentType")}
                      >
                        {touched.distributionCenter ? (
                          paymentTypeLocal &&
                          paymentTypeLocal.map((data) => (
                            <option className="p-1" value={data.name}>
                              {data.name}
                            </option>
                          ))
                        ) : (
                          <label className="p-1">No data available</label>
                        )}
                      </TextField>
                    </div>
                    <div className="col-6">
                      <label style={{ marginBottom: "0px" }}>
                        Expired Date<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        type="date"
                        margin="dense"
                        variant="outlined"
                        helperText={
                          touched.expiredDate ? errors.expiredDate : ""
                        }
                        error={
                          touched.expiredDate && Boolean(errors.expiredDate)
                        }
                        {...getFieldProps("expiredDate")}
                      ></TextField>
                    </div>
                    <div className="col-9">
                      <label>Notes</label>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        rowsMax={5}
                        label=""
                        margin="dense"
                        variant="outlined"
                        helperText={touched.notes ? errors.notes : ""}
                        error={touched.notes && Boolean(errors.notes)}
                        {...getFieldProps("notes")}
                      ></TextField>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <hr />
              <div className="row" id="product">
                <div className="col-3">
                  <strong>Products</strong>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-9">
                      <label style={{ marginBottom: "0px" }}>
                        Product<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        placeholder="Product"
                        select
                        label="Product"
                        margin="dense"
                        variant="outlined"
                        helperText={touched.product ? errors.product : ""}
                        error={touched.product && Boolean(errors.product)}
                        {...getFieldProps("product")}
                      >
                        {productsLocal && productsLocal.length > 0 ? (
                          productsLocal.map((data, index) => (
                            <option
                              className="p-1"
                              key={index}
                              value={data.product_name}
                            >
                              {data.product_name}
                            </option>
                          ))
                        ) : (
                          <label>Loading...</label>
                        )}
                      </TextField>
                    </div>
                    <div className="col-3" style={{ paddingLeft: "0px" }}>
                      <label style={{ marginBottom: "0px" }}>
                        Unit<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        select
                        label="Unit"
                        margin="dense"
                        variant="outlined"
                        helperText={touched.unit ? errors.unit : ""}
                        error={touched.unit && Boolean(errors.unit)}
                        {...getFieldProps("unit")}
                      >
                        {touched.product ? (
                          productsLocal &&
                          productsLocal.map((data) =>
                            data.product_name === values.product
                              ? data.units.map((item) => (
                                  <option className="p-1" value={item.name}>
                                    {item.name}
                                  </option>
                                ))
                              : ""
                          )
                        ) : (
                          <label>No data available</label>
                        )}
                      </TextField>
                    </div>
                    <div className="col-3">
                      <label style={{ marginBottom: "0px" }}>
                        Quantity<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        type="number"
                        label=""
                        margin="dense"
                        variant="outlined"
                        helperText={touched.quantity ? errors.quantity : ""}
                        error={touched.quantity && Boolean(errors.quantity)}
                        {...getFieldProps("quantity")}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: 1000,
                          },
                        }}
                      ></TextField>
                    </div>
                    <div className="col-3" style={{ paddingLeft: "0px" }}>
                      <label style={{ marginBottom: "0px" }}>
                        Price<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        fullWidth
                        type="number"
                        label=""
                        margin="dense"
                        variant="outlined"
                        helperText={touched.price ? errors.price : ""}
                        error={touched.price && Boolean(errors.price)}
                        {...getFieldProps("price")}
                        name="price"
                        onChange={handleChange}
                        value={values.price}
                      ></TextField>
                    </div>
                    <div className="col-6" style={{ paddingLeft: "0px" }}>
                      <label
                        className="float-right"
                        style={{ marginBottom: "0px" }}
                      >
                        Total Price<span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        align="right"
                        fullWidth
                        disabled
                        type="number"
                        label=""
                        margin="dense"
                        variant="outlined"
                        helperText={touched.price ? errors.price : ""}
                        error={touched.price && Boolean(errors.price)}
                        {...getFieldProps("totalPrice")}
                        style={{ background: "#eaeaea", textAlign: "right" }}
                      ></TextField>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
                <div className="offset-7 col-4" style={{ paddingLeft: "0px" }}>
                  <hr sytle={{ width: "500px", marginBottom: "8px" }} />
                  <div className="row">
                    <div className="col-6">
                      <label>
                        <strong>Total Nett Price</strong>
                      </label>
                    </div>
                    <div className="col-6">
                      <label className="float-right">
                        <strong>{values.totalPrice}</strong>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="offset-3 col-4">
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-warning shadow-sm"
                        style={{ color: "white" }}
                        onClick={newItem}
                      >
                        New Item +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="offset-7 col-4" style={{ paddingLeft: "0px" }}>
                  <div
                    className="row"
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <div className="col-6">
                      <label>
                        <strong>Total</strong>
                      </label>
                    </div>
                    <div className="col-6">
                      <label className="float-right">
                        <strong>{values.totalPrice}</strong>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <Button
                type="submit"
                variant="contained"
                className="float-right btn-success"
                disabled={!(isValid && dirty)}
              >
                CONFIRM
              </Button>
              <Button className="float-right" style={{ marginRight: "10px" }}>
                CANCEL
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

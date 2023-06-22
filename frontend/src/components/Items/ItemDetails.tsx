import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/api";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useStore } from "../../store/useStore";
import showNotification from "../../utils/notification";
import Countdown from "../Layout/Countdown";

function ItemDetails(props) {
  let { id } = useParams();
  const { dispatch } = useStore();
  const firstRender = useRef(true);
  const [item, setItem] = useState<any>({});
  const YupSchema = Yup.object().shape({
    amount: Yup.number()
      .positive()
      .min(item?.currentPrice || item.startingPrice)
      .required("Required"),
  });
  async function getItemById() {
    const resp = await api.item.getItem(id);
    if (resp.status) {
      setItem(resp.body);
    }
  }
  useEffect(() => {
    if (firstRender.current) {
      getItemById();
      firstRender.current = false;
    }
  }, []);
  return (
    <div
      style={{
        width: "40%",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span>Item Name :</span>{" "}
        <span style={{ fontWeight: "bold" }}>{item.name}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span>Owned By :</span>
        <span style={{ fontWeight: "bold" }}>{item?.User?.name}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span> Starting Price :</span>
        <span style={{ fontWeight: "bold" }}>{item.startingPrice}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span>Current Price :</span>
        <span style={{ fontWeight: "bold" }}>{item.currentPrice}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span>Auction Status:</span>
        <span style={{ fontWeight: "bold" }}>{item.status}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span>Total Bids :</span>
        <span style={{ fontWeight: "bold" }}>{item.Bids?.length}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <span>Expiring In :</span>
        <span>
          {item.auctionEndTime && (
            <Countdown
              endDate={item.auctionEndTime}
              key={item.auctionEndTime}
            />
          )}
        </span>
      </div>
      <Formik
        initialValues={{
          amount: "",
        }}
        validationSchema={YupSchema}
        onSubmit={async (values, { resetForm }) => {
          const response = await api.bid.placeBid({
            amount: values.amount as any,
            itemId: item.id,
          });
          if (response.status) {
            resetForm();
            getItemById();
            const resp = await api.users.getMyProfile();
            showNotification("Your Bid Is Placed");
            if (resp.status)
              dispatch({ type: "UPDATE_BALANCE", payload: resp.body?.balance });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
            <div>
              <label htmlFor="amount">Bidding Amount</label>
              <Field type="number" name="amount" />
              <ErrorMessage name="amount" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ItemDetails;

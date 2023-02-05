import React from "react";
import axios from "axios";
import { BASE_URL } from "../../config/constant";
import DataGrid from "components/table/DataGrid";

import { PageHeaderAction } from "components/PageHeaderAction";
import { Drawer } from "components/Drawer";
import { UserForm } from "../../features/users/UserForm";
import { useCallback, useState } from "react";
import { ROUTES } from "definitions/constant/routes";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const FingerPrint = () => {
  const [allcustomer, setAllCustomer] = React.useState([]);
  const [viewPending, setViewPending] = React.useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [readonly, setReadOnly] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const params = useParams();
  const { pathname } = useLocation();

  React.useEffect(() => {
    fetchAllPendingFingerprint();
  }, []);

  const reset = useCallback(() => {
    setOpenDrawer(false);
    setEditItem(null);
    setReadOnly(false);
  }, []);

  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("jhp_token");
  };

  const fetchAllPendingFingerprint = async () => {
    try {
      const result = await axios.get(BASE_URL + "agent/allPendingFingerprint", {
        headers: {
          encryption: false,
          access_token: getToken(),
        },
      });
      if (result.data) {
        setAllCustomer(result.data.data);
        toast.success(result.data.message)

      }
    } catch (error) {
      console.error(error);
      //@ts-ignore
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "name", headerName: "Name" },
    { headerName: "Main Aadhaar", field: "mainAadhaar" },
    { headerName: "Family Aadhaar", field: "familyAadhaar", flex: 1 },
    { headerName: "Mobile", field: "mobile", flex: 1 },
    {
      headerName: "Registered Agency",
      field: "registeredAgencyName",
      flex: 1,
    },
    { headerName: "Main Agent", field: "mainAgent", flex: 1 },
    { headerName: "Sub Agent", field: "subAgent", flex: 1 },
    { headerName: "Installation", field: "installtatus" },
    { headerName: "Free Delivery", field: "isFreeDelivery", flex: 1 },
    { headerName: "Single Women", field: "isSingleWomen", flex: 1 },
    { headerName: "Registration", field: "registrationStatus", flex: 1 },
    { headerName: "Remarks", field: "remarks" },
  ];

  return (
    <React.Fragment>
      <div>
        <PageHeaderAction
          title="User"
          breadCrumbs={
            pathname === ROUTES.user
              ? [{ link: "#", title: "User" }]
              : [
                { link: ROUTES.company, title: "Company" },
                { link: "#", title: "User" },
              ]
          }
          onBtnClick={() => {
            setOpenDrawer(true);
          }}
        />
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                firstName: false,
                lastName: false,
                middleName: false,
              },
            },
          }}
          columns={columns}
          rows={allcustomer}
        />
        <Drawer
          title="Update User"
          variant="lg"
          anchor="right"
          open={openDrawer}
          onClose={() => reset()}
        >
          <UserForm
            readonly={readonly}
            editData={editItem}
            onParentClose={(data) => {
              reset();
            }}
          />
        </Drawer>
      </div>
    </React.Fragment>
  );
};

export default FingerPrint;

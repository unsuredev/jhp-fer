import { GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { searchUsersAsync, selectUser } from "app/services/users/userSlice";
import { ActionMenu } from "components/ActionMenu";
import { Drawer } from "components/Drawer";
import { PageHeaderAction } from "components/PageHeaderAction";
import DataGrid from "components/table/DataGrid";
import { ROUTES } from "definitions/constant/routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { UserForm } from "./UserForm";

export const UserCom = () => {
  // router
  const params = useParams();
  const { pathname } = useLocation();
  // redux
  const user = useAppSelector(selectUser);
  // const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  // state
  const [openDrawer, setOpenDrawer] = useState(false);
  const [readonly, setReadOnly] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "mobile", headerName: "Mobile", flex: 1 },
      {
        field: "login_type",
        headerName: "User Type",
        flex: 1,
        valueGetter: (params) => {
          console.log({ params });
          let result = [];
          if (params.row.login_type) {
            if (params.row.login_type === "mobile") {
              result.push("Agent");
            }
            if (params.row.login_type === "email") {
              result.push("Employee");
            }
          } else {
            result = ["Manager"];
          }
          return result.join(", ");
        },
      },
      {
        field: "city",
        headerName: "Location",
        flex: 1,
      },

      {
        field: "action",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => {
          return (
            <ActionMenu
              menuItems={[
                {
                  icon: "ci:edit",
                  label: "Edit",
                  onClick: () => {
                    setEditItem(params.row);
                    setOpenDrawer(true);
                  },
                },
                {
                  icon: "carbon:data-view-alt",
                  label: "View",
                  onClick: () => {
                    setEditItem(params.row);
                    setReadOnly(true);
                    setOpenDrawer(true);
                  },
                },
              ]}
            />
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(searchUsersAsync("dummy"));
  }, []);

  // useEffect(() => {
  // }, []);

  const reset = useCallback(() => {
    setOpenDrawer(false);
    setEditItem(null);
    setReadOnly(false);
  }, []);

  return (
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
      <DataGrid columns={columns} rows={user.users} />
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
  );
};

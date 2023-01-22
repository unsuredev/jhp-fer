import { GridColDef } from "@mui/x-data-grid";
import { ActionMenu } from "components/ActionMenu";
import { Drawer } from "components/Drawer";
import { PageHeaderAction } from "components/PageHeaderAction";
import DataGrid from "components/table/DataGrid";
import { ROUTES } from "definitions/constant/routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { UserForm } from "../users/UserForm";
import { BASE_URL } from "config/constant";
import axios from "axios";
import { getToken } from "app/services/UtilServices";
import toast from "react-hot-toast";

export const Agent = () => {
    // router
    const { pathname } = useLocation();
    // const auth = useAppSelector(selectAuth);

    // state
    const [openDrawer, setOpenDrawer] = useState(false);
    const [readonly, setReadOnly] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: "name", headerName: "Name", flex: 1 },
            { field: "mobile", headerName: "Mobile" },
            {
                field: "address",
                headerName: "Address",
                flex: 2,
            },
            {
                field: "active",
                headerName: "Active",
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
        handleAgentlist()
    }, []);

    const reset = useCallback(() => {
        setOpenDrawer(false);
        setEditItem(null);
        setReadOnly(false);
    }, []);

    const [list, setList] = useState([])

    const handleChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const [user, setUser] = useState({
        name: "",
        address: "",
        mobile: "",
    });


    const [useragent, setUseragent] = useState({
        name: "",
        address: "",
        mobile: "",
    });


    const handleSubmit = async (event: any) => {
        try {
            event.preventDefault();

            const result = await axios.post(BASE_URL + "agent/add", {
                "name": user.name,
                "mobile": user.mobile,
                "address": user.address
            }, {
                headers: { encryption: false },
            });
            if (result.data && result.data.status === "success") {
                //showToast("Registered susccesssfully", "success");
            }
        } catch (error) {
            //@ts-ignore
            //showToast(error.response.data.message, "error")
        }
    }



    const handleAgentlist = async () => {
        try {

            const result = await axios.get(BASE_URL + "agent/getall",
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                }
            );
            if (result.data && result.data.status === "success") {
                setList(result.data.data.agents)
                toast.success(result.data.message)
            }
        } catch (error) {
            //@ts-ignore
            toast.error(error.response.data.message,)
        }
    };

    const toggleChecked = async (mobile: any) => {
        try {
            const result = await axios.post(BASE_URL + "agent/block", { "mobile": mobile }, {
                headers: {
                    encryption: false,
                    access_token: getToken()
                }
            })
            if (result.data && result.data != null) {
                //  showToast(result.data.message, "success");
                window.location.reload();

            }
        } catch (error) {
            //@ts-ignore
            //showToast(error.response.data.message, "error")
        }
    };



    return (
        <div>
            <PageHeaderAction
                title="Agent"
                breadCrumbs={
                    pathname === ROUTES.user
                        ? [{ link: "#", title: "Agents" }]
                        : [
                            { link: ROUTES.company, title: "Company" },
                            { link: "#", title: "Agents" },
                        ]
                }
                onBtnClick={() => {
                    setOpenDrawer(true);
                }}
            />
            <DataGrid columns={columns} rows={list} />
            <Drawer
                title="Update Agent"
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

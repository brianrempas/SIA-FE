// UserPage.js
import UserTable from './UserTable';
import UserForm from './UserForm';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { useEffect } from 'react'
import { setSnackbar } from '../../reducers/snackbar';
import { setUserData } from '../../reducers/AllDataSlice'
import { selectUserData, selectStudentData, selectLectureData } from '../../reducers/AllDataSlice';
import { useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '../../services/UserService';
import { selectRole } from '../../reducers/authSlice';

export default function UserPage() {

  const dispatch = useAppDispatch()
  const studentData = useAppSelector(selectStudentData)
  const lectureData = useAppSelector(selectLectureData)
  const userData = useAppSelector(selectUserData)
  const formData = {
    studentData: studentData,
    lectureData: lectureData
  }

  const roleData = useAppSelector(selectRole)

    if (roleData !== 'admin'){
        return <h1>Unauthorized</h1>
    }

  const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
    useGetUserQuery();
  const [createUser, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
    useCreateUserMutation();
  const [updateUser, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
    useUpdateUserMutation();
  const [deleteUser, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
    useDeleteUserMutation();


  const submitSignup = async (n: any) => {
    await createUser(n)
    refreshTable()
  }

  const submitUpdate = async (data: any) => {
    await updateUser(data);
    refreshTable();
  };

  const submitDelete = async (inputId: number) => {
    await deleteUser(inputId);
    refreshTable();
  };

  const refreshTable = async () => {
    await getRefetch();
  };


  useEffect(() => {
    if (getIsSuccess) {
      dispatch(setUserData({ userData: getData?.result }));
    }
    if (getIsError) {
      console.log('error: ' + getError)
    }
  }, [getData, getIsSuccess, getIsError]);

  useEffect(() => {
    if (createIsSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Create User Success",
          alertColor: "success",
        })
      );
    }
    if (createIsError) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Create User Failed",
          alertColor: "error",
        })
      );
    }
  }, [createIsSuccess, createIsError]);

  useEffect(() => {
    if (updateIsSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Update User Success",
          alertColor: "success",
        })
      );
    }
    if (updateIsError) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Update User Failed",
          alertColor: "error",
        })
      );
    }
  }, [updateIsSuccess, updateIsError]);

  useEffect(() => {
    if (deleteIsSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Delete User Success",
          alertColor: "success",
        })
      );
    }
    if (deleteIsError) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Delete User Failed",
          alertColor: "error",
        })
      );
    }
  }, [deleteIsSuccess, deleteIsError]);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:10}}>
      <h1>User Page</h1>
      <UserForm formData={formData} toggleSubmit={submitSignup} modal="CU" />
      <UserTable formData={formData} data={userData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate} />
    </div>
  );
};

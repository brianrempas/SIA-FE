// UserPage.js
import UserTable from '../../../pages/Auth/user/UserTable';
import UserForm from './UserForm';
import { createAny, getAny, updateAny, deleteAny } from '../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks'
import { setUserData } from '../../../reducers/AllDataSlice'
import { selectUserData, selectStudentData, selectLectureData } from '../../../reducers/AllDataSlice';


export default function UserPage() {

  const dispatch = useAppDispatch()
  const studentData = useAppSelector(selectStudentData)
  const lectureData = useAppSelector(selectLectureData)
  const userData = useAppSelector(selectUserData)
  const formData = {
    studentData: studentData,
    lectureData: lectureData
  }
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFucmVtcGFzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5NTgzOTMwfQ.S5z4Y6keBPDgz_L04z7e62mwssITN81qwRrq2bPFt20'
  
  async function submitSignup(n:any) {
    const fetch = await createAny( n, token, 'http://localhost:3000/api/createuser' )
    refreshTable()

    switch(fetch.status) {
        case 201:
            console.log(fetch)
            break;
        case 200:
            console.log(fetch) 
            break;
        case 400:
            console.log(fetch)
            break;
        default:
            throw new Error(fetch.data.message);
    }
  } //for form

  async function submitUpdate(data: any) {
    const fetch = await updateAny( data, token, 'http://localhost:3000/api/updateuser' )
    refreshTable()

    switch(fetch.status) {
        case 201:
            console.log(fetch)
            break;
        case 200:
            console.log(fetch) 
            break;
        case 400:
            console.log(fetch)
            break;
        default:
            throw new Error(fetch.data.message);
    }
  }

  async function submitDelete(inputId: number) {
    const fetch = await deleteAny( inputId, token, 'http://localhost:3000/api/deleteuser' )
    refreshTable()

      switch(fetch.status) {
          case 201:
              console.log(fetch)
              break;
          case 200:
              console.log(fetch) 
              break;
          case 400:
              console.log(fetch)
              break;
          default:
              throw new Error(fetch.data.message);
      }
  }

  async function refreshTable(){
    const fetchUser = await getAny( token, 'http://localhost:3000/api/getusers')
    dispatch(setUserData({ userData: fetchUser.data.result }));
  }

  /*useEffect(() => {
    refreshTable()
  }, [submitSignup, submitUpdate, submitDelete])
  */
 

  return (
    <div>
      <h1>User Page</h1>
      <UserForm formData={formData} toggleSubmit={submitSignup} modal="CU"/>
      <UserTable data={userData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate}/>
    </div>
  );
};

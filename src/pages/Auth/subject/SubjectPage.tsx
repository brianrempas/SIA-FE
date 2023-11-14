import SubjectTable from "./SubjectTable"
import SubjectForm from "./SubjectForm";
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks'
import { setSubjectData } from '../../../reducers/AllDataSlice'
import { createAny, getAny, updateAny, deleteAny } from '../../../services/api'
import { selectSubjectData } from '../../../reducers/AllDataSlice';

export default function subjectPage() {

    const dispatch = useAppDispatch()
    const subjectData = useAppSelector(selectSubjectData)
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFucmVtcGFzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5ODUzMTU2fQ.ojwPFP8yhzTkkYIh2YH5Ox2hYIRF0uLycDzjML1hWc0';

    async function submitSignup(n:any) {
        const fetch = await createAny( n, token, 'http://localhost:3000/api/createsubject' )
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

    async function submitUpdate(data: any) {
        const fetch = await updateAny( data, token, 'http://localhost:3000/api/updatesubject' )
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
        const fetch = await deleteAny( inputId, token, 'http://localhost:3000/api/deletesubject' )
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
        const fetchUser = await getAny( token, 'http://localhost:3000/api/getsubject')
        dispatch(setSubjectData({ subjectData: fetchUser.data.result }));
    }

    return (
        <>
            <h1>Subject Page</h1>
            <SubjectForm modal='CU' toggleSubmit={submitSignup} />
            <SubjectTable data={subjectData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate}/>
        </>
    )
}

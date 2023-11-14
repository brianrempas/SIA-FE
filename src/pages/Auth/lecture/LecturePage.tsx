import LectureTable from "./LectureTable"
import LectureForm from "./LectureForm";
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks'
import { setLectureData } from '../../../reducers/AllDataSlice'
import { createAny, getAny, updateAny, deleteAny } from '../../../services/api'
import { selectLectureData } from '../../../reducers/AllDataSlice';

export default function LecturePage() {

    const dispatch = useAppDispatch()
    const lectureData = useAppSelector(selectLectureData)
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFucmVtcGFzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5ODUzMTU2fQ.ojwPFP8yhzTkkYIh2YH5Ox2hYIRF0uLycDzjML1hWc0';

    async function submitSignup(n:any) {
        const fetch = await createAny( n, token, 'http://localhost:3000/api/createlecture' )
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
        const fetch = await updateAny( data, token, 'http://localhost:3000/api/updatelecture' )
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
        const fetch = await deleteAny( inputId, token, 'http://localhost:3000/api/deletelecture' )
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
        const fetchUser = await getAny( token, 'http://localhost:3000/api/getlecture')
        dispatch(setLectureData({ lectureData: fetchUser.data.result }));
    }

    return (
        <>
            <h1>Lecture Page</h1>
            <LectureForm modal='CU' toggleSubmit={submitSignup} />
            <LectureTable data={lectureData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate}/>
        </>
    )
}

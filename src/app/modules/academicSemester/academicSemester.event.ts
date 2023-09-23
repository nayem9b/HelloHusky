import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED, EVENT_ACADEMIC_SEMESTER_UPDATED } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(data);
    console.log(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.updateOneIntoDBFromEvent(data);
    console.log("Updated Data:", data);
  });
};

export default initAcademicSemesterEvents;


// {
//   "password": "123456",
//   "student": {
//     "name": {
//       "firstName": "Rezwan",
//       "lastName": "Ahmed",
//       "middleName": "Nayem"
//     },
//     "dateOfBirth":"25-03-2000",
//     "gender": "male",
//     "bloodGroup": "B+",
//     "email": "razwanniam1@gmail.com",
//     "contactNo": "01222222",
//     "presentAddress": "Dhaka"
//   }
// }
// Booking.ts

import {CarWashingProgram} from './CarWashingProgram'; // Import the appropriate CarWashingProgram type
import {Car} from './Car'; // Import the appropriate Car type
import {User} from './User'; // Import the appropriate User type
import {Station} from './Station'; // Import the appropriate Station type
import {Wash} from './Wash'; // Import the appropriate Wash type

export interface Booking {
  id: number;
  car: Car;
  washingProgram: CarWashingProgram;
  user: User;
  scheduledTime: string; // You might need to adjust the type based on your Date/Time handling library
  station: Station;
  wash: Wash;
  token: string;
  executed: boolean;
  createdAt: string; // You might need to adjust the type based on your Date/Time handling library
  updatedAt: string; // You might need to adjust the type based on your Date/Time handling library
}

// Note: You need to create or import the appropriate types for CarWashingProgram, Car, User, Station, and Wash.

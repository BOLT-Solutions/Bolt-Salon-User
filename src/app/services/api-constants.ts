export const API_CONSTANTS = {

    // CUSTOMER
  ///api/Customer/Login
    CUSTOMERLOGIN: "/Customer/Login"  , 
    ADD_NEW_CUTOMER: "/Customer/AddNewCustomer", 
    LOGIN: "/Customer/Login",
    GET_CUSTOMER_TOTAL_NUMBER_OF_VISIT: "/Customer/GetCustomerTotalNumberOfVisit",
    GET_CUSTOMER_VISIT_DETAILS: '/Customer/GetCustomerVisitDetails',
    GET_NUMBER_OF_CUSTOMER_FOR_TODAY: '/Customer/GetNumberOfCustomerVisitForToday',
    GET_TOTAL_AMOUNT_OF_SERVICE_COST_FOR_TODAY: '/Customer/TotalAmountOfServiceCostForToday',
    GET_AVERAGE_WAITING_FOR_TODAY: '/Customer/AverageWaitingForToday',
    GUEST_LOGIN: '/Customer/GuestLogin',
    GET_CUSTOMER_BY_ID: '/Customer/GetCustomerById/',
    
    // BARBER
    GET_ALL_BARBERS: "/Barber/getAllBarbers", // userFrontend
    GET_NUMBER_OF_AVAILABLE_BARBERS: "/Barber/GetNumberOfAvailableBarbers",
    GET_BARBER_TOTAL_NUMBER_OF_HANDELED_CUSTOMER_BY_ID: "/Barber/BarberTotalNumberOfHandledCustomer",  // userFrontend
    GET_BARBER_DETAILS_REPORT: "/Barber/GetBarberDetailsReports",
    GET_ALL_AVAILABLE_BARBERS: "/Barber/GetAllAvailableBarbers",

    // DailyReport
    SAVE_DAILY_REPORT: "/DailyReport/SaveDailyReport",


    // Feedback
    ADD_SERVICE_FEEDBACK_QUESTION: "/Feedback/AddServiceFeedbackQuestion",
    REMOVE_SERVICE_FEEDBACK_QUESTION: "/Feedback/RemoveServiceFeedbackQuestion",
    UPDATE_SERVICE_FEEDBACK_QUESTION: "/api/Feedback/EditServiceFeedbackQuestion",
    GET_ALL_ORDER_FEEDBACK_QUESTIONS: "/Feedback/GetAllOrderFeedbackQuestions",
    GET_ORDER_FEEDBACK_QUESTION_BY_ID: '/Feedback/GetOrderFeedbackQuestionsById',
    GET_FEEDBACK_BY_ID: '/Feedback/GetFeedbackById',
    GET_ALL_ORDER_FEEDBACK:'/Feedback/GetAllOrderFeedbacks',

    // Order
   GET_ORDER_SERVICES: "/Order/GetOrderServices",
   ADD_ORDER_SERVICE: "/Order/SetOrderService",
   DELETE_ORDER: '/Order/CancelOrder',
   FINALIZE_ORDER:'/Order/FinalizeOrder',
    

    // Queue
   GET_BARBER_QUEUE: "/Queue/GetBarberQueue", 
   REASSIGN_ORDER_TO_DIFFERENT_QUEUE: '​/Queue​/Re-AssignOrderToDifferentQueue​',
   GET_BARBER_QUEUE_WAITING_TIME: '/Queue/GetBarberQueueWaitingTime',  // userFrontend
   SET_BARBER_QUEUE_WAITING_TIME: '/Queue/SetQueueWaitingTimes',  // userFrontend

   ADD_ORDER_TO_QUEUE:'/Queue/AddOrderToQueue',
    // Service

   CREATE_SERVICE: "/Service/CreateService",
   DELETE_SERVICE: "/Service/DeleteService",
   UPDATE_SERVICE: '/Service/EditService',
   GET_ALL_SERVICES: '/Service/getAllServices',


  //SMS
   GET_SMS_BY_ID: '/Sms/getsms',
   UPDATE_SMS: '/Sms/EditSms',

    // Users
   CREATE_ROLE: "/Users/CreateRole",
   ASSIGN_ROLE: "/Users/AssignRole",
   CREATE_ADMIN_ACCOUNT: "/Users/CreateAdminAccount",
   DELETE_ADMIN: '/api/Users/DeleteAdmin',
   ADMIN_LOGIN: '/Users/AdminLogin',
  GET_USER_DAILY_EARNING_PER_TIME: '/Users/GetUserDailyEarningPerTime',

  //promo code
  CREATE_PROMOCODE: "/PromoCode/CreatePromoCode",
  DELETE_PROMOCODE: "/PromoCode/DeletePromoCode",
  UPDATE_PROMOCODE: "/PromoCode/EditPromoCode",
  APPLY_PROMOCODE: "/PromoCode/ApplyPromoCode",
  GET_ALL_PROMOCODES: "/PromoCode/GetAllPromoCodes",



}

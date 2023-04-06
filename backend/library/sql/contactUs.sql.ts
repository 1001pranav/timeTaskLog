import { AppDataSource } from "./dataSource";
import { ContactUs } from "./entity/contactUs";

const addContactUsQuery = async (contactObj: any) => {

    const { id, name, email, subject, feedbackDescription } = contactObj;

    const contactUs = new ContactUs();
    contactUs.id = id ?? null;
    contactUs.name = name;
    contactUs.email = email ?? null;
    contactUs.subject = subject;
    contactUs.feedbackDescription = feedbackDescription ?? null;
    // contactUs.date = date ?? Date.now();

    console.log("contactUs",contactUs);
    
    await AppDataSource.manager.save(contactUs);
    console.log(contactUs);
    

}

export default addContactUsQuery;
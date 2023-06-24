import { AppDataSource } from "./dataSource";
import { ContactUs } from "./entity/contactUs";
import { ContactUsTypes } from '../../constant/index';

const addContactUsQuery = async (contactObj: ContactUsTypes) => {

    const { id, name, email, subject, feedbackDescription } = contactObj;

    const contactUs = new ContactUs();
    contactUs.id = id ?? null;
    contactUs.name = name;
    contactUs.email = email ?? null;
    contactUs.subject = subject;
    contactUs.feedbackDescription = feedbackDescription ?? null;
    // contactUs.date = date ?? Date.now();

    await AppDataSource.manager.save(contactUs);
    console.log(contactUs);
    

}

export default addContactUsQuery;
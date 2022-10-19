import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   // can even use user credentials that are not exposed to the user - as this is done on the server side
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  //fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://alexei_322:45GReekDog!@cluster0.ylztnwl.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

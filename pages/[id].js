// import Layout from '../components/layout';
// import { getAllFolderIds, getFolderData } from '../lib/folders';

// const Folder = ({ folderData }) => (
//   <Layout>
//     {folderData.title}
//     <br />
//     {folderData.id}
//     <br />
//     {folderData.date}
//   </Layout>
// );

// export async function getStaticPaths() {
//   const paths = getAllFolderIds();
//   return {
//     paths,
//     fallback: false
//   };
// }

// export async function getStaticProps({ params }) {
//   const folderData = getFolderData(params.id);
//   return {
//     props: {
//       folderData
//     }
//   };
// }

// export default Folder;

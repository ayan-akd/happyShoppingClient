import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import Loading from "../Component/Loading";
const Featured = () => {
  const axiosSecure = useAxios();
  const { data: featured ,isLoading} = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const response = await axiosSecure.get("/featured");
      return response.data;
    },
  });
  let nodes = [];
  if (featured) {
    nodes = featured.map((blog, index) => ({
      serial: (index + 1).toString(),
      title: blog.name,
      author: blog.userName.toUpperCase(),
      picture: blog.userPhoto,
    }));
  }

  const COLUMNS = [
    {
      label: "Serial",
      renderCell: (item) => item.serial,
      resize: true,
    },
    {
      label: "Blog Title",
      renderCell: (item) => item.title,
      resize: true,
    },
    { label: "Author Name", 
    renderCell: (item) => item.author,
     resize: true },
    {
      label: "Author Picture",
      renderCell: (item) => (
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src={item.picture} />
          </div>
        </div>
      ),
      resize: true,
    },
  ];

  const data = { nodes };

  const theme = useTheme(getTheme());

  return (
    <div
      style={{
        backgroundImage: "url(/bg-tips.jpg)",
      }}
    >
      {
        isLoading ? (<Loading></Loading>) : (
          <div className="max-w-screen-xl mx-auto px-2">
        <h1 className="text-3xl md:text-5xl text-center mt-12">
          Top 10 <span className="text-grn">Blogs</span>
        </h1>
        <div className="my-12">
          <CompactTable columns={COLUMNS} data={data} theme={theme} />
        </div>
      </div>
        )
      }
    </div>
  );
};

export default Featured;

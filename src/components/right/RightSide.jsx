import userImage from "../../assets/images/user.svg";
const RightSide = () => {

  const contacts = [
    {
      id: 1,
      name: "Yusri Nelson",
      src:userImage,
    },
    {
      id: 2,
      name: "Rhowan Jantjies",
      src:userImage,
    },
    {
      id: 3,
      name: "Diego Jeftha",
      src:userImage,
    },
    {
      id: 4,
      name: "Bryan Williams",
      src:userImage,
    },
    {
      id: 5,
      name: "Kiyaam Petersen",
      src:userImage,
    },
  ]

  return (
    <div className="hidden md:block basis-1/6 md:basis-1/4" >
      <h1 className="flex items-center justify-center text-2xl my-4">CONTACTS</h1>
      <div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-2 py-2 px-3 md:mx-2 mt-2 rounded-md cursor-pointer hover:bg-gray-100 text-[15px]"
          >
            <img
              src={contact.src}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="text-gray-700">{contact.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightSide
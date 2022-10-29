import type { NextPage } from "next";
import { faker } from "@faker-js/faker";
import Item, { ItemProps } from "../components/item";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const [itemData, setItemData] = useState<ItemProps[]>([]);
  const userName: string = "Blah";
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  // Generate some fake items.
  useEffect(() => {
    const items: ItemProps[] = [];
    for (let i = 0; i < 3; i++) {
      items.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        seller: faker.name.findName(),
      });
    }
    setItemData(items);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/");
    return <div>Please sign in to continue</div>;
  }

  const itemElements = [];
  for (let i = 0; i < itemData.length; i++) {
    const item = <Item key={i} {...itemData[i]} />;
    itemElements.push(item);
  }

  const callApi = async () => {
    const token = await user.getIdToken();
    console.log("Calling API with user token:", token);

    const echoEndpoint: string = "https://jwtecho.pixegami.io";
    const certStr: string =
      "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAPjqZct4TJTXMA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIy\nMDYyODA5Mzg0OFoXDTIyMDcxNDIxNTM0OFowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQCoE53t7eIqUK4kW6XVg/kDNA9oMa/RhCLVWeoTsZlEeFF5\n3NzvTup8SpHXoGJv75J7SUWfNYOhuPegPieBILvFF0Cj3Cxx+1WsXaFTUUacwwbO\n+bdPfPpYzIuaKk5zTvFvosurRyBKmx/cvIRam5TgJl45sUm2JkfBZ1ksitpPeC4Q\nGqVzf/We7cJ2m/cURrj0mtNb+IbcDH5C2901ujXFi/wFCZGWNlXyPxZknqgSUGB2\nZA/kWNjxVB62Crav1DJUwjRFhhp4ebFGe4XieTkgVCXVMfLa+M0jvqasdFT2XFgM\nmiNMU1RpFLCU/qAbN3s3OmdnidxET5T5twIu+LS1AgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQA+57jXDDfb7E9M1Pe0k2yjHmglCaygXO64Sg/kjdPM\nn839PAK1CuQrTRYG5YaCiGqIHWsjloHrJT629EvOvSfErClo9cwZJhpwsRrRPy+w\nYN0cp0FV+cOqtGnSIYAReFSiYEXulYGK6dBI87xb2s8WkMkegXjHO+taVMgXuTN/\nwnTJuWYD0JJzE08oDwwUO4LR8/jlbd7PV0YAWkoGOOiPVO52275BANcGNt1az980\njMgR58XXEOJ5I61jUiAvGQCB/+Qi6hQvJOsTAvhqBj0GIWmY6kRlzPF7pmTUNP/4\nVuC2jW8SP3S9SR6w37SWLcD60LFs6n1lnBoPFI9E/5/U\n-----END CERTIFICATE-----\n";
    const encodedCertStr: string = encodeURIComponent(certStr);
    const audience: string = "pixegami-online-store";

    const verificationEndpoint: string = `${echoEndpoint}/verify?audience=${audience}&cert_str=${encodedCertStr}`;

    const requestInfo = {
      headers: {
        Authorization: "Bearer " + token + "xx",
      },
    };

    const response = await fetch(verificationEndpoint, requestInfo);
    const responseBody = await response.json();
    console.log(responseBody);
  };

  return (
    <div>
      <div className="text-left mb-6 text-sm bg-sky-100 p-3">
        <div className="mb-1 text-blue-500">Signed in as: {userName}</div>
        <button onClick={() => auth.signOut()} className="hover:underline ">
          Sign Out
        </button>
      </div>
      <div className="text-center flex flex-col gap-6 items-center">
        {itemElements}
      </div>
      <div className="mt-8 w-full flex">
        <button
          onClick={callApi}
          className="text-center bg-blue-600 text-white rounded-md p-2 w-48"
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

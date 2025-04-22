
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    id: 1,
    companyName: "Adani Power",
    category: "Energy",
    bidPrice: "₹329",
    quantity: 150,
    amount: "₹49,350",
    status: "Pending",
  },
  {
    id: 2,
    companyName: "Tata Technologies",
    category: "Technology",
    bidPrice: "₹500",
    quantity: 200,
    amount: "₹100,000",
    status: "Successful",
  },
];

const IPOSubscription = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">IPO Subscription History</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          New Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Investments</h3>
          <p className="text-3xl font-bold text-purple-600">₹149,350</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Applications</h3>
          <p className="text-3xl font-bold text-purple-600">2</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-purple-600">50%</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Bid Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">
                  {subscription.companyName}
                </TableCell>
                <TableCell>{subscription.category}</TableCell>
                <TableCell>{subscription.bidPrice}</TableCell>
                <TableCell>{subscription.quantity}</TableCell>
                <TableCell>{subscription.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      subscription.status === "Successful"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default IPOSubscription;

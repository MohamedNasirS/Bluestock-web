
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockData = [
  {
    id: 1,
    companyName: "Adani Power",
    allotmentDate: "2024-06-15",
    sharesApplied: 150,
    sharesAllotted: 75,
    refundAmount: "₹24,675",
    status: "Partial",
  },
  {
    id: 2,
    companyName: "Tata Technologies",
    allotmentDate: "2024-07-20",
    sharesApplied: 200,
    sharesAllotted: 200,
    refundAmount: "₹0",
    status: "Full",
  },
];

const IPOAllotment = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">IPO Allotment Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-purple-600">2</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Shares Allotted</h3>
          <p className="text-3xl font-bold text-purple-600">275</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Refund</h3>
          <p className="text-3xl font-bold text-purple-600">₹24,675</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Allotment Date</TableHead>
              <TableHead>Shares Applied</TableHead>
              <TableHead>Shares Allotted</TableHead>
              <TableHead>Refund Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((allotment) => (
              <TableRow key={allotment.id}>
                <TableCell className="font-medium">
                  {allotment.companyName}
                </TableCell>
                <TableCell>{allotment.allotmentDate}</TableCell>
                <TableCell>{allotment.sharesApplied}</TableCell>
                <TableCell>{allotment.sharesAllotted}</TableCell>
                <TableCell>{allotment.refundAmount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      allotment.status === "Full"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {allotment.status}
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

export default IPOAllotment;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ToggleRight,
  MapPin,
  History,
  User,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Flowchart() {
  return (
    <div className="p-4 grid gap-8">
      <Card className="bg-gray-50">
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <User className="w-10 h-10 text-blue-600" />
              <p>Driver Login/Register</p>
            </div>

            <ArrowRight className="text-gray-500 w-6 h-6" />

            <div className="flex flex-col items-center">
              <Bell className="w-10 h-10 text-green-600" />
              <p>Driver Dashboard</p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full mt-4">
              <div className="flex flex-col items-center">
                <ToggleRight className="w-8 h-8 text-yellow-600" />
                <p>Toggle Emergency</p>
                <ArrowRight className="text-gray-500 w-6 h-6" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Send Location to Traffic</p>
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-blue-600" />
                <p>Enter Route</p>
                <ArrowRight className="text-gray-500 w-6 h-6" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Start Navigation</p>
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <History className="w-8 h-8 text-red-600" />
                <p>View History</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 输入 [[{"function":{"arguments":"","name":"setVolume"},"id":"call_wdpwgmiszun2ej6radzriaq0","index":0,"type":"function"}],[{"function":{"arguments":" {\""},"index":0}],[{"function":{"arguments":"volume"},"index":0}],[{"function":{"arguments":"\":"},"index":0}],[{"function":{"arguments":" "},"index":0}],[{"function":{"arguments":"2"},"index":0}],[{"function":{"arguments":"1"},"index":0}],[{"function":{"arguments":"}"},"index":0}]]
// 输出 [{"function":{"arguments":" {\"volume\": 21}","name":"setVolume"},"id":"call_wdpwgmiszun2ej6radzriaq0","index":0,"type":"function"}]

import { get } from "lodash";
import { FunctionCall } from "../type";

export const combineFunction = (packages: FunctionCall[][]): FunctionCall[] => {
  return packages.reduce((callFunctions: FunctionCall[], itemArray) => {
    itemArray.forEach((call) => {
      const index = call.index;
      if (callFunctions[index]) {
        const existingCall = callFunctions[index];
        const existingArguments = get(existingCall, "function.arguments", "");
        const newArguments = get(call, "function.arguments", "");
        const combinedArguments = existingArguments + newArguments;
        const combinedCall: FunctionCall = {
          ...existingCall,
          function: {
            ...existingCall.function,
            arguments: combinedArguments,
          },
        };
        callFunctions[index] = combinedCall;
      } else {
        callFunctions[index] = call;
      }
    });
    return callFunctions;
  }, []);
};

// combineFunction([[{"function":{"arguments":"","name":"setVolume"},"id":"call_wdpwgmiszun2ej6radzriaq0","index":0,"type":"function"}],[{"function":{"arguments":" {\""},"index":0}],[{"function":{"arguments":"volume"},"index":0}],[{"function":{"arguments":"\":"},"index":0}],[{"function":{"arguments":" "},"index":0}],[{"function":{"arguments":"2"},"index":0}],[{"function":{"arguments":"1"},"index":0}],[{"function":{"arguments":"}"},"index":0}]])

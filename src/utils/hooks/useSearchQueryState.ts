import { useQueryState } from "nuqs";
import { useMemo } from "react";

export function useSearchQueryState(name: string, initialValue: string) {
  const [localState, setLocalState] = useQueryState(name);

  const state = useMemo(() => {
    return localState ?? initialValue;
  }, [localState]);

  function setState(value: string) {
    setLocalState(value ? value : null);
  }

  return [state, setState] as const;
}

// Old version. Outdated params snapshot causes simultaneous updates to fail
// export function useSearchQueryStateOld(name: string, fallback: string) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const [localState, setLocalState] = useState(
//     searchParams.get(name) ?? fallback,
//   );

//   function setState(value: string) {
//     setLocalState(value);

//     const params = new URLSearchParams(searchParams);
//     params.set(name, value);

//     const queryString = params.toString();
//     console.log("pushing params: ", queryString);
//     const fullPath = queryString ? `${pathname}?${queryString}` : pathname;
//     router.push(fullPath);
//   }

//   return [localState, setState] as const;
// }

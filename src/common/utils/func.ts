export const genBaseSlug = (name: string) => name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const forceToInfoPagition = (
    page: number = 0,
    limit: number = 20,
): { skip: number; take: number; page: number } => {
    page = +page;
    const skip = +limit * +page - +limit;
    const take = +limit > -1 && +limit < 100 ? +limit : 100;

    return { skip, take, page };
};
type TMongoDocument = import('mongoose').Document;

type TMongoId = import('mongoose').Schema.Types.ObjectId;

type THandler = import('express').Handler;

type TResponse = import('express').Response;

type TRequest = import('express').Request;

type TNext = import('express').NextFunction;

type TUserState = 'active' | 'inactive' | 'banned';
